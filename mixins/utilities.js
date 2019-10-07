import { EventBus } from '../bus';

export const utilities = {
    methods: {
        doLogoutRoutine() {
            localStorage.setItem("_c",null);
            localStorage.setItem("_s",null);
            localStorage.setItem("_r",null);
            localStorage.setItem("_n",null);
            EventBus.$emit("MenuUpdateEvent");
            EventBus.$emit("AvatarUpdateEvent");
        }
    }
}