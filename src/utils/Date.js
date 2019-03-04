let now =new Date(),
    hour=now.getHours(),
    timeSlot;

    switch(true){
        case hour<8:
        timeSlot='早上';
        break;
        case hour>=8&&hour<12:
        timeSlot='上午';
        break;
        case hour>=12&&hour<2:
        timeSlot='中午';
        break;
        case hour>=2&&hour<18:
        timeSlot='下午';
        break;
        case hour>18:
        timeSlot='晚上';
        break;
    }

    export{
        timeSlot
    }