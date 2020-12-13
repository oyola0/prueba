

function Week(args) {
    this.days = [];
    this.number;
    this.month;

    //initialization
    var init = function (day) {
        for (var i = 1; i <= 7; i++) {
            this.days.push(day.clone().isoWeekday(i));
        }
        this.number = day.isoWeek();
        this.month = day.format('MMMM');
        this.year = day.format('YYYY');
    }.call(this, args.day);

}

//get next week
Week.prototype.next = function () {
    var sunday = this.days[6];
    var mondayAfter = sunday.clone().add(1, 'days');
    return new Week({ day: mondayAfter });
}
//get previous week
Week.prototype.prev = function () {
    var monday = this.days[0];
    var sundayBefore = monday.clone().subtract(1, 'days');
    return new Week({ day: sundayBefore });
}

//Days of the week
Week.prototype.Monday = function () { return this.days[0]; }
Week.prototype.Tuesday = function () { return this.days[1]; }
Week.prototype.Wednesday = function () { return this.days[2]; }
Week.prototype.Thursday = function () { return this.days[3]; }
Week.prototype.Friday = function () { return this.days[4]; }
Week.prototype.Saturday = function () { return this.days[5]; }
Week.prototype.Sunday = function () { return this.days[6]; }

module.exports=Week;
