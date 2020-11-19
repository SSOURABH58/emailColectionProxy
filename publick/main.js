const inputemail = document.querySelector('.inpotemail')
const inputname = document.querySelector('.inpotname')
const inputbtn = document.querySelector('.inpotbtn')
const passwordbox = document.querySelector('.passwordbox')
const passenter = document.querySelector('.passenter')
const datav = document.querySelector('.datav')

passenter.addEventListener('click',e=>{
    e.preventDefault();
    const opc={
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify({pass:passwordbox.value})
    }
    console.log('geting resopnce')
    fetch('/getemails',opc)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            datav.innerHTML=''
            for(ele of data){
                const valp = document.createElement('p')
                valp.innerHTML=`${ele.name} : ${ele.email}`
                datav.appendChild(valp)
            }
            })
    passwordbox.value=''
})

inputbtn.addEventListener('click',e=>{
    e.preventDefault();
    const opc = {
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify({name:inputname.value,email:inputemail.value})
    }
    fetch('/colectemail',opc)
})