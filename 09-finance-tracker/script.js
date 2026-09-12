const balance = document.querySelector('.balance-amount')
const description = document.querySelector('.descr')
const amount = document.querySelector('.amount')
const type = document.querySelector('.type')
const add = document.querySelector('.btn')
const transactions = document.querySelector('.transactions-list')

const transactionsArray = [

]

function getTransactionObject () {
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

function transaction () {
    const descriptionValue = description.value.trim()
    const amountValue = amount.value.trim()
    const typeValue = type.value.trim()

    if (!descriptionValue || !amountValue || !typeValue) {
        alert('Please fill in all transaction fields.')
        return
    }

    const transactionObject = getTransactionObject()
    transactionsArray.push(transactionObject)
    console.log(transactionsArray)
}

add.addEventListener('click', transaction)