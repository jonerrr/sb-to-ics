(function () {
	function ymd(e) {
		let t = Math.floor(((e - 1) * 4) / 1461);
		const n = Math.floor((t + 3) / 4);
		let r = e - t * 365 - n;
		t += 2008;
		const i = t % 4 == 0 ? 1 : 0;
		let s = 0;
		if (r <= 31) {
			s = 0;
		} else {
			r -= 31;
			if (r <= 28 + i) {
				s = 1;
			} else {
				r -= 28 + i;
				if (r <= 31) {
					s = 2;
				} else {
					r -= 31;
					if (r <= 30) {
						s = 3;
					} else {
						r -= 30;
						if (r <= 31) {
							s = 4;
						} else {
							r -= 31;
							if (r <= 30) {
								s = 5;
							} else {
								r -= 30;
								if (r <= 31) {
									s = 6;
								} else {
									r -= 31;
									if (r <= 31) {
										s = 7;
									} else {
										r -= 31;
										if (r <= 30) {
											s = 8;
										} else {
											r -= 30;
											if (r <= 31) {
												s = 9;
											} else {
												r -= 31;
												if (r <= 30) {
													s = 10;
												} else {
													r -= 30;
													if (r <= 31) {
														s = 11;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return { year: t, month: s, day: r };
	}

	function rrule_dow(day_of_week) {
		switch (day_of_week) {
			case 0:
				return 'SU';

			case 1:
				return 'MO';

			case 2:
				return 'TU';

			case 3:
				return 'WE';

			case 4:
				return 'TH';

			case 5:
				return 'FR';

			case 6:
				return 'SA';
		}
	}

	function parse_time(t1) {
		const hour = Math.floor(t1 / 60);
		let minute = t1 - hour * 60;

		if (minute <= 9) {
			minute = '0 ' + minute.toString();
		}

		return { hour, minute: parseInt(minute) };
	}

	// this function finds the next day of week if the first day of the week is before the semester starts
	function findNextDayOfWeek(date, targetDay) {
		const dayOfWeek = date.getDay();
		const daysUntilNextTarget = (targetDay + 7 - dayOfWeek) % 7 || 7;
		const nextTargetDate = new Date(date);
		nextTargetDate.setDate(date.getDate() + daysUntilNextTarget);

		return nextTargetDate;
	}

	const events = [];

	BB.activeState.results[0].selPros.forEach((selPro) => {
		if (selPro.isChosen()) {
			const title = selPro.cn.key;
			// console.log(title);
			const class_data = selPro.sel.classes[0];

			const timeblocks = class_data.timeblocks;
			// console.log(class_data)
			// async classes don't have timeblocks
			timeblocks.forEach((timeblock) => {
				const timeblock_location = class_data.getLocForTimeBlock(timeblock.id);

				const dow = timeblock.day - 1;
				const start_ymd = ymd(timeblock.d1);
				const start_time = parse_time(timeblock.t1);

				const end_ymd = ymd(timeblock.d2);
				const end_time = parse_time(timeblock.t2);

				const start_dt = new Date(
					start_ymd.year,
					start_ymd.month,
					start_ymd.day,
					start_time.hour,
					start_time.minute
				);
				const end_dt_first = new Date(
					start_ymd.year,
					start_ymd.month,
					start_ymd.day,
					end_time.hour,
					end_time.minute
				);
				const duration = end_dt_first.getTime() - start_dt.getTime();

				const actual_start_dt =
					start_dt.getDay() === dow ? start_dt : findNextDayOfWeek(start_dt, dow);

				// console.log(start_ymd, start_time, end_ymd, end_time, dow);

				const event = {
					title,
					description: class_data.teacher,
					location: timeblock_location,
					startInputType: 'local',
					// months are not zero indexed for RRULE format
					recurrenceRule: `FREQ=WEEKLY;BYDAY=${rrule_dow(dow)};INTERVAL=1;UNTIL=${end_ymd.year}${end_ymd.month + 1}${end_ymd.day}`,
					start: actual_start_dt.getTime(),
					duration: {
						hours: Math.floor(duration / 3600000),
						minutes: Math.floor((duration % 3600000) / 60000)
					}
				};
				events.push(event);
			});
		}
	});

	// console.log(events);
	import('https://cdn.skypack.dev/ics').then(({ createEvents }) => {
		const { value } = createEvents(events);
		const ics_file = new File([value], 'class_schedule.ics', { type: 'text/calendar' });

		const url = URL.createObjectURL(ics_file);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'class_schedule.ics';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	});
})();
