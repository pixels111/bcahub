
// LOADER
const loader = document.getElementById("loader");
const pct = document.getElementById("loaderPct");

if(loader && pct){

  if(sessionStorage.getItem("loaderShown")){

    loader.style.display = "none";

  }else{

    sessionStorage.setItem("loaderShown","true");

    let p = 0;

    const iv = setInterval(() => {

      p += Math.floor(Math.random() * 8) + 4;

      if(p >= 100){

        p = 100;
        pct.textContent = "100%";

        clearInterval(iv);

        // Stay at 100% for 1 second
        setTimeout(() => {

          loader.classList.add("done");

        }, 200);

        return;
      }

      pct.textContent = p + "%";

    }, 100);

  }

}