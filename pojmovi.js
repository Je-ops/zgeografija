// export class Pojmovi{

//     constructor(u){
//         //osoba i soba gde se kreira razgovor je najbitnijer i redje se menja nego message i created at.
//         //oni se kreiraju tek klikom na dugme-posalji poruku
//         //this.kategorija = k;//ovo poziva nas seter
//         this.username = u;
//         this.pojmovi = db.collection('pojmovi');//ovo db potice iz index.html tu smo let db dodali na kraju!
//         //ptravimo da smo subskrajbovani na sobu
//         this.unsub;//ne deklarisemo je, samo postoji. dole deklaraciju u callback fji vrsimo
//         //pa je a sada promenljiva
//     }

    
//     // set kategorija(k){
//     //     this._kategorija = k;//setujem _atribut!
//     // }

//     set username (u){
//         this._username = u;
//     }
    
//     // get kategorija(){
//     //     return this._kategorija;//vracam atribut. atribut je polje i ide sa donjom crtom
//     // }

//     get username(){
//         return this._username;
//     }

//     updateUsername(newUsername){
//         this.username = newUsername;
//         localStorage.setItem('username',newUsername);
//     }//ovaj username 1.parametar mozemo kako ocemo da nazovemo!

//     // updateKategorija(newKategorija){
//     //     this.kategorija = newKategorija;//opet seter, nova soba
//     // }



//     // async addPojam(poj) {
//     //     let dateTmp = new Date();
//     //     //kreiramo dokument koji cemo dodati bazi
//     //     let geografija = {
//     //         pojam: poj,
//     //         kategorija:this.kategorija,
//     //         username:this.username,
//     //         vreme: firebase.firestore.Timestamp.fromDate(dateTmp)
//     //     }
//     //     //dodamo cet(dokument) bazi tako sto promenljivoj dodamo da ga sacuva prvo
//     //     let response = await this.pojmovi.add(geografija);//AWAIT ISKLJUCIVO U ASINHRONOJ FJI!! 
//     //     //ne vraca bilo koja fja promise. samo await
//     //     return response;
//     // }
    
// }
//console.log(db);
// let kol = db.collection('pojmovi');
// console.log(kol);

// let dokumentn = kol.doc('vIPzu7oZ6baPRahBz2KT');//id dokumenta
// console.log(dokumentn);

let dokumemntrm = db.doc('pojmovi/vIPzu7oZ6baPRahBz2KT');

// Klasa
class Geografija {
  constructor(u, k, p, s) {
    this.username = u;
    this.kategorija = k;
    this.pojam = p;
    this.slovo = s;
    this.zgeografija = db.collection("pojmovi");
  }
  
  
  set username(u) {
    this._username = u;
  }

  set kategorija(k) {
    this._kategorija = k;
  }

  set pojam(p) {
    this._pojam = p;
  }
  set slovo(s) {
    this._slovo = s;
  }

  get username() {
    return this._username;
  }

  get kategorija() {
    return this._kategorija;
  }
  
  get pojam() {
    return this._pojam;
  }
  
  get slovo() {
    return this._slovo;
  }
  
  
  async dodajPojam(poj) {
    let date = new Date();

    let predlog = {
      korisnik: this.korisnik,
      kategorija: this.kategorija,
      pojam: poj,
      slovo: this.pocetnoSlovo(poj),
      vreme: firebase.firestore.Timestamp.fromDate(date),
    };

    let response = await this.zgeografija.add(predlog);
    return response;
  }
 
  proveriPojam(poj) {
    this.zgeografija
      .where("kategorija", "==", this.kategorija)
      .where("pojam", "==", this.pojam)
      .get()
      .then((snapshot) => {
        // snapshot.forEach((doc) => {
        //   console.log("heej", doc.data().pojam);
        // }
          //ako ne postoji objekat
          if (snapshot.docs.length == 0) {
            this.dodajPojam(poj);
            console.log(`Pojam ${poj} dodat!`);
          } else {
          console.log(`Pojam ${poj} vec postoji!`);
        }
      })
      .catch((err) => {
        console.error(`Greska: ${err}`);
      });
  }

  updateUsername(newUsername){
             this.username = newUsername;
             localStorage.setItem('username',newUsername);
         }
  
  pocetnoSlovo(poj) {
    let pocetnoSlovo = poj.slice(0, 1);
    pocetnoSlovo.toUpperCase();
    return pocetnoSlovo;
  }
}

//

let formUsername = document.querySelector("#formUsername");
let inputUsername = document.querySelector("#inputUsername");
let divUU = document.querySelector("#divUpdatedUsername");
let formPojmovi = document.querySelector("#formPojmovi");
let inputPojam = document.querySelector("#inputPojam");
let kategorija = document.querySelector("#kategorija");

console.log(formUsername, formPojmovi);

let username = () => {
    if (localStorage.username) {
      return localStorage.username;
    } else {
      return false;
    }
  };
  
  
let geografija = new Geografija(username());
  

formUsername.addEventListener("submit", (e) => {
  e.preventDefault();
  geografija.updateUsername(inputUsername.value);
  localStorage.username = inputUsername.value;
});

if (localStorage.getItem('korisnik') == null) {
    //alert('unesite korisnicko ime.');
    no.click();
}
// else {
//     formPojmovi.style.display = 'block';
// }
close.addEventListener('click', () => {
    alert('Please entey your username and log in')
}) 



formPojmovi.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputPojam.value.length && geografija.proveriPojam(inputPojam.value) == false) {
        let pojam = pojamInput.value.replace(/[^A-Š0-9]/ig, ""); // brise sve razmake i znakove
        pojam = pojam[0].toUpperCase() + pojam.slice(1).toLowerCase(); // setuje prvo slovo da bude veliko, a ostala mala
        geografija.dodajPojam(inputPojam.value);
        formPojmovi.reset();
    } else {
        console.log('postoji');
    }
});


console.log(geografija);