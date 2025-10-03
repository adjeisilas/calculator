const display = document.querySelector("#display");
const buttons = document.querySelector(".btn");

buttons.forEach(button => {
    button.addEventListener("click", () =>{
        this.classList.add("pressed");

        const value = this.getAttribute('data-vaue');
        handleInput(value)
    })
})