export const configPhoneNumber = (phone)=>{
    if(phone.length == 10){
        return '+84'+ (phone +'').substring(1, (phone +'').length);
    }else if(phone.length == 12){
        return phone;
    }
}