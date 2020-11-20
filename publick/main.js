// const { Blob } = require("node-fetch")

const inputemail = document.querySelector('.inpotemail')
const inputname = document.querySelector('.inpotname')
const inputbtn = document.querySelector('.inpotbtn')
const passwordbox = document.querySelector('.passwordbox')
const passenter = document.querySelector('.passenter')
const datav = document.querySelector('.datav')
const dowbtn = document.querySelector('.dowbtn')

let csvdata
const downloadbtn = document.createElement('button')
downloadbtn.innerText='download'
const clearbtn = document.createElement('button')
clearbtn.innerText='cleardb'

const objtocsv = (obj)=>{
    const csvros = []
    const headers =  Object.keys(obj[0])
    csvros.push(headers.join(','))

    for(const row of obj){
        const value = headers.map(header=>row[header])
        csvros.push(value.join(','))
    }

    return csvros.join('\n')
}

const download = (data)=>{
    const blob = new Blob([data],{type:'text/csv'})
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('href',url)
    a.setAttribute('header','')
    a.setAttribute('download','EmailList.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

passenter.addEventListener('click',e=>{
    e.preventDefault();
    console.log("1")
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
            datav.innerHTML=''
            for(ele of data){
                const valp = document.createElement('p')
                valp.innerHTML=`${ele.name} : ${ele.email}`
                datav.appendChild(valp)
            }
            csvdata = objtocsv(data)
            console.log(csvdata)
            dowbtn.appendChild(downloadbtn)
            dowbtn.appendChild(clearbtn)
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

downloadbtn.addEventListener('click',()=>download(csvdata))
clearbtn.addEventListener('click',e=>{
    e.preventDefault();
    const opc={
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify({pass:passwordbox.value})
    }
    fetch('/clear',opc)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            })
    passwordbox.value=''})