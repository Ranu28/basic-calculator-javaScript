class Calculator {

    constructor(preOperandText, curOperandText) {
        this.preOperandText = preOperandText
        this.curOperandText = curOperandText
        this.clear()
    }
    clear() {
        this.curOperand = ''
        this.preOperand = ''
        this.operation = undefined
    }
    delete() {
        this.curOperand = this.curOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.curOperand.includes('.')) return
        this.curOperand = this.curOperand.toString() + number.toString()
    }
    chooseOpeation(operation) {
        if (this.curOperand === '') return
        if (this.preOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.preOperand = this.curOperand
        this.curOperand = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.preOperand)
        const cur = parseFloat(this.curOperand)

        if (isNaN(prev) || isNaN(cur)) return

        switch (this.operation) {
            case '+':
                computation = prev + cur;
                break
            case '-':
                computation = prev - cur;
                break
            case '*':
                computation = prev * cur;
                break
            case '/':
                computation = prev / cur;
                break
            default:
                return
        }
        this.curOperand = computation
        this.operation = undefined
        this.preOperand = ''
    }
    getDisplayNumber(number) {
            const stringNumbe = number.toString()
            const integerDigit = parseFloat(stringNumbe.split('.')[0])
            const decimalDigit = stringNumbe.split('.')[1]


            let integerDisplay
            if (isNaN(integerDigit)) {
                integerDigit = ''
            } else {
                integerDisplay = integerDigit.toLocaleString('en', {
                    maximumFractionDigits: 0
                })
            }
            if (decimalDigit != null) {
                return `${integerDisplay}.${decimalDigit}`
            } else { return integerDigit }
            // const floatNumber = parseFloat(number)
            // if (isNaN(floatNumber)) return
            // return floatNumber.toLocaleString('en')
            // return number
        }
        //     updateDislay() {
        //         this.curOperandText.innerText =
        //             this.curOperand
        //         if (this.operation != null) {
        //             this.preOperandText.innerText =
        //                 `${this.preOperand} ${this.operation}`

    //         }
    //     }
    // }
    updateDislay() {
        this.curOperandText.innerText =
            this.getDisplayNumber(this.curOperand)
        if (this.operation != null) {
            this.preOperandText.innerText =
                `${this.getDisplayNumber(this.preOperand)} ${this.operation}`

        } else {
            this.preOperandText.innerText = ''
        }
    }
}



const numberButton = document.querySelectorAll('[data-num]')
const operationButton = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const daleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const preOperandText = document.querySelector('[data-pre-oper]')
const curOperandText = document.querySelector('[data-cur-oper]')

const calculator = new Calculator(preOperandText, curOperandText)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        // console.log(button.innerText)
        calculator.appendNumber(button.innerText)
        calculator.updateDislay()
    })
})
operationButton.forEach(button => {
    button.addEventListener('click', () => {
        // console.log(button.innerText)
        calculator.chooseOpeation(button.innerText)
        calculator.updateDislay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDislay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDislay()
})

daleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDislay()
})