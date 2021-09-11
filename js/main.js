function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getAmount() {
    return parseInt(document.getElementById("investmentAmount").value);
}

function getTerm() {
    return parseInt(document.getElementById("termMonths").value);
}

function getPercentage() {
    return parseInt(document.getElementById("interestRate").value);
}

function setNewAmount(amount) {
    let newAmountDisplay = document.getElementById("newAmountDisplay");
    newAmountDisplay.textContent = amount.toFixed(2);
}

function updateProgress(value) {
    let bar = document.getElementById("progress");
    let progress = parseFloat(bar.style.width.replace('%', ''));
    bar.style.width = (progress + value) + "%";
}

function resetProgress() {
    let bar = document.getElementById("progress");
    console.log(bar.style.width);
    bar.style.width = "0%";
    console.log(bar.style.width);
}

async function calculate() {
    let percentagePerMonth = getPercentage() / 12;

    let newAmount = getAmount();
    let progressInterval = 100/getTerm()
    for (let i = 0; i < getTerm(); i++) {
        newAmount = newAmount + (newAmount * (percentagePerMonth / 100));
        setNewAmount(newAmount);
        updateProgress(progressInterval);
        await sleep(100);
    }
}

window.addEventListener('load', function () {
    let form = document.getElementById("interest-form")
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        resetProgress();
        setNewAmount(getAmount());
        calculate();
    })
});