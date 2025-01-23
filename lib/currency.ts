import axios from 'axios'


export const currency_convert = async(from:string,to:string,ammount:number) => {
const result=await axios.post('http://localhost:3001/currency/convert-currency', {
    'from':from,
    'to':to,
    'ammount':ammount

})


  return result.data ;
}

export const currency_list = async() => {
    const result=await axios.get('http://localhost:3001/currency/all-currencies')
    return result.data ;
}

