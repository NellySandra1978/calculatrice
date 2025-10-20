var display = document.getElementById('display');
var sciButtons = document.getElementById('sci-buttons');
function append(value) {
    display.value += value;
}
function clearDisplay() {
    display.value = '';
}
function calculate() {
    try {
        if (display.value.trim() === '') {
            display.value = '0';
            return;
        }
        var result = eval(display.value);
        display.value = result.toString();
    }
    catch (e) {
        display.value = 'Erreur';
    }
}
function toggleScientific() {
    sciButtons.classList.toggle('active');
}
function applyFunc(func) {
    var value = display.value;
    try {
        if (value.trim() === '')
            return;
        var numValue = eval(value);
        var result = void 0;
        switch (func) {
            case 'sin':
                result = Math.sin(toRadians(numValue));
                break;
            case 'cos':
                result = Math.cos(toRadians(numValue));
                break;
            case 'tan':
                result = Math.tan(toRadians(numValue));
                break;
            case 'sqrt':
                result = Math.sqrt(numValue);
                break;
            case 'pi':
                display.value += Math.PI.toString();
                return;
            default:
                return;
        }
        display.value = result.toString();
    }
    catch (e) {
        display.value = 'Erreur';
    }
}
// Convertir degrés → radians
function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}
// ---- Ajout automatique des événements sur les boutons numériques et opérateurs ----
document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(function (btn) {
        var _a;
        var text = ((_a = btn.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
        if (text === '=') {
            btn.addEventListener('click', calculate);
        }
        else if (text === 'C') {
            btn.addEventListener('click', clearDisplay);
        }
        else {
            btn.addEventListener('click', function () { return append(text); });
        }
    });
    var sciExtraBtns = sciButtons.querySelectorAll('button');
    sciExtraBtns.forEach(function (btn) {
        var _a;
        var text = ((_a = btn.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
        if (text === 'π') {
            btn.addEventListener('click', function () { return applyFunc('pi'); });
        }
        else if (text === '(' || text === ')') {
            btn.addEventListener('click', function () { return append(text); });
        }
    });
});
