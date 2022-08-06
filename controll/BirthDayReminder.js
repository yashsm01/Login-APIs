var DaysCount = (birth) =>{
    const bday = new Date(birth);
    const today = new Date();
    const week = new Date(today.getTime() + 1000*60*60*24*7);
    let leap = new Date(week.getFullYear(), 1, 29).getDate() === 29 ? 364 : 365;
    let days = new Date( week.getFullYear()+"-"+(bday.getMonth()+1).toString().padStart(2, '0')+"-"+(bday.getDate()+1).toString().toString().padStart(2, '0')+"T"+ week.getHours().toString().padStart(2, '0')+":"+week.getMinutes().toString().padStart(2, '0')+":"+week.getSeconds().toString().padStart(2, '0'));
    let daysLeft = Math.floor((days.getTime()-today.getTime())/(1000*60*60*24));
    daysLeft = daysLeft > leap ? Math.floor((days.getTime()-today.getTime() - 1000*60*60*24*leap)/(1000*60*60*24)) : daysLeft;

    return  daysLeft >= 0 && daysLeft < 8 ? daysLeft +" days to go" :"";
}

module.exports = DaysCount;