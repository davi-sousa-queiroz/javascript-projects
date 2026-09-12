const balance = document.querySelector('.balance-amount')
const description = document.querySelector('.descr')
const amount = document.querySelector('.amount')
const type = document.querySelector('.type')
const add = document.querySelector('.btn')
const transactions = document.querySelector('.transactions-list')

const transactionsArray = [

]

function getTransaction () {
    const descriptionValue = description.value
    const amountValue = amount.value
    const typeValue = type.value

    const transactionObject = {
        description: descriptionValue,
        amount: amountValue,
        type: typeValue
    }
    return transactionObject
}