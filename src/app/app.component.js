var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, toast) {
        var _this = this;
        this.rootPage = TabsPage;
        this.platform = Platform;
        this.toast = ToastController;
        this.backButtonPressed = false; //用于判断返回键是否触发
        this.platform = platform;
        this.toast = toast;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            _this.initializeApp();
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            //注册返回按键事件
            _this.platform.registerBackButtonAction(function () {
                var activeVC = _this.nav.getActive();
                var page = activeVC.instance;
                if (!(page instanceof TabsPage)) {
                    if (!_this.nav.canGoBack()) {
                        //当前页面为tabs，退出APP
                        return _this.showExit();
                    }
                    //当前页面为tabs的子页面，正常返回
                    return _this.nav.pop();
                }
                var tabs = page.tabs;
                var activeNav = tabs.getSelected();
                if (!activeNav.canGoBack()) {
                    //当前页面为tab栏，退出APP
                    return _this.showExit();
                }
                //当前页面为tab栏的子页面，正常返回
                return activeNav.pop();
            }, 101);
        });
    };
    //双击退出提示框，这里使用Ionic2的ToastController
    MyApp.prototype.showExit = function () {
        var _this = this;
        if (this.backButtonPressed)
            this.platform.exitApp(); //当触发标志为true时，即2秒内双击返回按键则退出APP
        else {
            var toast = this.toast.create({
                message: '再按一次退出应用',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
            this.backButtonPressed = true;
            //2秒内没有再次点击返回则将触发标志标记为false
            setTimeout(function () {
                _this.backButtonPressed = false;
            }, 2000);
        }
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen,
            ToastController])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map