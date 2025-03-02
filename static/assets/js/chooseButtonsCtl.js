let status = {
    from: {
        school: 0,
        university: 1,
    },
    type: {
        whole: 0,
        mixed: 1,
    }
}

const school = document.getElementById('school');
const university = document.getElementById('university');
const mixed = document.getElementById('mixed');
const whole = document.getElementById('whole');

school.style.opacity = 1;
university.style.opacity = 0.66;
whole.style.opacity = 1;
mixed.style.opacity = 0.66;

function onSchoolClick() {
    status.from.school = 1;
    status.from.university = 0;
    
    school.style.opacity = 1;
    university.style.opacity = 0.66;
}

function onUniversityClick() {
    status.from.school = 0;
    status.from.university = 1;
    
    school.style.opacity = 0.66;
    university.style.opacity = 1;
}

function onWholeClick() {
    status.type.whole = 1;
    status.type.mixed = 0;
    
    whole.style.opacity = 1;
    mixed.style.opacity = 0.66;
}

function onMixedClick() {
    status.type.whole = 0;
    status.type.mixed = 1;
    
    whole.style.opacity = 0.66;
    mixed.style.opacity = 1;
}