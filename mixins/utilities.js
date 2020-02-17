import { EventBus } from '../bus';

export const utilities = {
    methods: {
        doLogoutRoutine(nopush) {
            localStorage.setItem("_c",null);
            localStorage.setItem("_s",null);
            localStorage.setItem("_r",null);
            localStorage.setItem("_n",null);
            EventBus.$emit("MenuUpdateEvent");
            EventBus.$emit("AvatarUpdateEvent");
            if (nopush===null) {
                this.$router.push("auth");
            }
        },
        formatPhone: function(ed) {
            ed=ed.splice(7, 0, "-");
            ed=ed.splice(4, 0, "-");
            return ed.splice(1, 0, "-");
        },
        makeDate: function(day,time) {
            var ds=day.split('-');

            var dt = ds[2]+"-"+ds[0]+"-"+ds[1]+"T";
            
            if (time!==null && time!=="") {
                var pt=this.makeTime(time).split(":");
                
                var ah=0;
                if (time.indexOf(" PM")>-1) {
                    pt[0] = String(parseInt(pt[0])+12);
                    if (pt[0]=="24") {
                        pt[0]="12";
                    }
                }
                else if (pt[0]==="12") {
                    pt[0]="0";
                }

                if (pt[0].length===1) {
                    pt[0]="0"+pt[0];
                }
                if (pt[1].length===1) {
                    pt[1]="0"+pt[1];
                }
                return dt+pt[0]+":"+pt[1]+":"+pt[2]+"Z";
            }
            else {
                return dt+"00:00:00Z";
            }
        },
        makeTime: function(time) {
            if (time.indexOf(" AM")>-1) {
               return time.replace(" AM","")+":00";
            }
            else {
                return time.replace(" PM","")+":00";
            }
        },
        parseTime: function(ti) {
            var tip = ti.split(":");
            var ap="AM";
            if (tip[0]>=12) {
                ap="PM";
                tip[0]-=12;
            }
            return tip[0]+":"+tip[1]+" "+ap;
        },
        standardizePhone(phone) {
            try {
                phone= phone.replace(/[^0-9]/g,"");
                if (phone.length===10) {
                    phone="1"+phone;
                }
                if (phone.length===11) {
                    return phone;
                }
            }
            catch(e) {}
    
            return "NotOK";
        },
        verifyEmail: function(email) {
            var emailVerification = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
            if (!emailVerification.test(email)) {
                return "Email address is invalid";
            }
            return "OK";
        },
        verifyPhone: function(phone) {
            var phoneVerification = /^1?-?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            if (!phoneVerification.test(phone)) {
                return "Phone number is invalid";
            }
            return "OK";
        }
    }
}