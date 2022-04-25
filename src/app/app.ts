import HomeController from './controller/homeController/homeController';

export default function starts():void {
    let app: HTMLElement = document.getElementById('app')!;
    new HomeController(app).renderHome();
}