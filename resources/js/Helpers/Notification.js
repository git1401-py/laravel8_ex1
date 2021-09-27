class Notification {

    success() {
        new Noty({
            type: "success",
            layout: "topRight",
            text: "با موفقیت انجام شد",
            timeout: 1000
        }).show();
    }
    
    alert() {
        new Noty({
            type: "alert",
            layout: "topRight",
            text: "مطمئنید?",
            timeout: 1000
        }).show();
    }

    error() {
        new Noty({
            type: "alert",
            layout: "topRight",
            text: "چیزی اشتباه است!",
            timeout: 1000
        }).show();
    }

    warning() {
        new Noty({
            type: "warning",
            layout: "topRight",
            text: "متاسفانه چچیزی اشتباه است",
            timeout: 1000
        }).show();
    }
    
    image_validation() {
        new Noty({
            type: "error",
            layout: "topRight",
            text: "حجم عکس باید از 1M کمتر باشد",
            timeout: 1000
        }).show();
    }
    card_success() {
        new Noty({
            type: "success",
            layout: "topRight",
            text: "به سبد خرید اضافه شد!",
            timeout: 1000
        }).show();
    }
    card_delete() {
        new Noty({
            type: "success",
            layout: "topRight",
            text: "حذف شد!",
            timeout: 1000
        }).show();
    }
    
}

export default Notification = new Notification();
