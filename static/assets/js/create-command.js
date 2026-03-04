const setupButtonGroup = (buttons, input) => {
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => {
                btn.classList.remove("button-clicked");
                if (btn !== button) {
                    btn.classList.add("button-primary");
                }
            });
            
            button.classList.add("button-clicked");
            button.classList.remove("button-primary");
            
            input.value = button.dataset.key;
            
            console.log(`${input.name} =`, input.value);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const commandButtons = document.querySelectorAll(".command-type");
    const univerButtons = document.querySelectorAll(".univer-type");
    
    const commandInput = document.querySelector("input[name='command_type']");
    const univerInput = document.querySelector("input[name='univer_type']");
    
    setupButtonGroup(commandButtons, commandInput);
    setupButtonGroup(univerButtons, univerInput);
    
    commandButtons[0]?.classList.remove("button-primary");
    if (commandButtons[1] && !commandButtons[1].classList.contains("button-primary")) {
        commandButtons[1]?.classList.add("button-primary");
    }
    
    univerButtons[0]?.classList.remove("button-primary");
    if (univerButtons[1] && !univerButtons[1].classList.contains("button-primary")) {
        univerButtons[1]?.classList.add("button-primary");
    }
});