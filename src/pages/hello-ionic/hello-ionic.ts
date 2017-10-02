import { Component } from '@angular/core';
import { AlertController } from "ionic-angular";

@Component({
    selector: 'page-hello-ionic',
    templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    numFallos: number;
    numAciertos: number;

    readonly LETRAS: string[] = [
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "Ñ", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z", "*"
    ];

    readonly PALABRAS: string[] = ["PALABROTA", "CHIVICHANGA", "BAIFO", "RELENGAR"];

    botones: Array<{ letra: string, estado: string }>;

    palabraAAdivinar: string;
    palabraAdivinadaPorahora: string;

    constructor(public alertCtrl: AlertController) {
        this.inicializar();
    }

    inicializar(): void {
        this.numFallos = 0;
        this.numAciertos = 0;

        this.inicializarBotones();
        this.inicializarPalabraAAdivinar();
        this.inicializarPalabraAdivinadaPorAhora();
    }

    inicializarBotones(): void {
        this.botones = [];
        for (let i = 0; i < this.LETRAS.length; i++) {
            this.botones.push({
                letra: this.LETRAS[i],
                estado: "letraSinPulsar"
            });
        }
    }

    inicializarPalabraAdivinadaPorAhora(): void {
        this.palabraAdivinadaPorahora = "";

        for (let i = 0; i < this.palabraAAdivinar.length; i++) {
            this.palabraAdivinadaPorahora += "-";
        }
    }

    inicializarPalabraAAdivinar(): void {
        let aleatorio = Math.floor(Math.random() * this.PALABRAS.length);
        this.palabraAAdivinar = this.PALABRAS[aleatorio];
    }

    botonClicked(boton: { letra: string, estado: string }): void {
        if (this.seAcierta(boton.letra)) {
            boton.estado = "letraPulsadaAcertada";
            if (this.numAciertos == this.palabraAAdivinar.length) {
                this.showAlert("¡GANASTE!", "Pulsa OK para continuar", "OK");
            }
        } else {
            boton.estado = "letraPulsadaNoAcertada";
            this.numFallos++;
            if (this.numFallos == 6) {
                this.showAlert("¡PERDISTE!", "Pulsa OK para continuar", "OK");
            }
        }
    }

    seAcierta(letra: string): boolean {
        let acierto = false;

        for (let i = 0; i < this.palabraAAdivinar.length; i++) {
            if (letra == this.palabraAAdivinar.substr(i, 1)) {
                this.palabraAdivinadaPorahora =
                    this.palabraAdivinadaPorahora.substr(0, i) +
                    letra +
                    this.palabraAdivinadaPorahora.substr(i + 1);
                this.numAciertos++;
                acierto = true;
            }
        }
        return acierto;
    }

    showAlert(titulo: string, subtitulo: string, boton: string) {
        let alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subtitulo,
            buttons: [{
                text: boton,
                handler: () => {
                    this.inicializar();
                }
            }]
        });
        alert.present();
    }
}
