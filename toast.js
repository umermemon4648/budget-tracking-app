function toastAlert (msg){
    iziToast.warning({
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        timeout: 1000,
        position: 'topRight', 
        title: 'Alert',
        message: msg
    });
}