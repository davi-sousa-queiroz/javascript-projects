const balance = document.querySelector('.balance-amount')
const description = document.querySelector('.descr')
const amount = document.querySelector('.amount')
const type = document.querySelector('.type')
const add = document.querySelector('.btn')
const transactions = document.querySelector('.transactions-list')
const emptyState = document.querySelector('.empty-state')

const transactionsArray = [

]

let bankBalance = 0.00

function updateBalance (validation, amountt) {
    if (validation === true) {
        bankBalance += amountt
    } else {
        bankBalance -= amountt
    }
    balance.textContent = `$${bankBalance.toFixed(2)}`
}

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

function renderTransaction () {
    transactions.innerHTML = ''
    for (let i = 0; i < transactionsArray.length; i++) {
        const descriptionText = transactionsArray[i].description
        const amountText = transactionsArray[i].amount
        const typeText = transactionsArray[i].type

        const transactionElement = document.createElement('div')
        transactionElement.classList.add('transaction-item')

        const info = document.createElement('div')
        info.classList.add('transaction-info')

        const desc = document.createElement('div')
        desc.classList.add('transaction-desc')
        desc.textContent = descriptionText

        const typeLabel = document.createElement('div')
        typeLabel.classList.add('transaction-type')
        typeLabel.textContent = typeText

        const amountDiv = document.createElement('div')
        amountDiv.classList.add('transaction-amount')
        amountDiv.textContent = `$${amountText}`

        if (typeText === 'income') {
            amountDiv.classList.add('income')
        } else if (typeText === 'expense') {
            amountDiv.classList.add('expense')
        }

        info.appendChild(desc)
        info.appendChild(typeLabel)
        transactionElement.appendChild(info)
        transactionElement.appendChild(amountDiv)
        transactions.appendChild(transactionElement)
    }
}

function transaction () {
    emptyState.remove()
    const descriptionValue = description.value.trim()
    const amountValue = amount.value.trim()
    const typeValue = type.value.trim()

    if (!descriptionValue || !amountValue || !typeValue) {
        alert('Please fill in all transaction fields.')
        return
    }

    const transactionObject = getTransactionObject()
    transactionsArray.push(transactionObject)
    renderTransaction()

    const isIncome = typeValue === 'income'
    updateBalance(isIncome, Number(amountValue))

    description.value = ''
    amount.value = ''
    type.value = ''
}

add.addEventListener('click', transaction)