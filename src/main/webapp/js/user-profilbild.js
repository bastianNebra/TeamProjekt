//User Bilder In der Session Anlegen und anzeigen
document.querySelector("#profilbild").addEventListener("change",function () {
    const reader = new FileReader();
    reader.addEventListener("load",()=>{
        document.getElementById("image").innerHTML = `<img  width="100" height="100"  src="${reader.result}" alt=""/>`;
        sessionStorage.setItem("user-image",reader.result)
        if (sessionStorage.getItem("user-image") != null){
            document.getElementById("userImage-1").innerHTML = `<img  width="40" height="40"  src="${reader.result}" alt=""/>`;

        }
    })
    reader.readAsDataURL(this.files[0]);
})
