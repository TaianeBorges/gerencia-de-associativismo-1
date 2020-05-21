import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {Router, NavigationEnd} from '@angular/router';
import {SharedsService} from '../shareds.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    @Input() permission: boolean;
    auth: any;

    routeDemandManagement = false;
    routeWhoIs = false;
    routeSites = false;
    titlePage;
    menuActivate = false;
    menuMobileActivate = false;
    menuPerfilActivate = false;
    currentUser;
    notificationInterval: any;
    data = {
        page: 1,
        limit: 20,
        offset: 0,
        total: null
    };
    notifications = [];
    unread = 0;

    constructor(
        private authService: AuthService,
        private router: Router,
        private sharedsService: SharedsService
    ) {

        router.events.subscribe((res) => {
            if (res instanceof NavigationEnd) {
                this.routeDemandManagement = (res.url.indexOf('/gestao-de-demandas') !== (-1));
                this.routeWhoIs = res.url.indexOf('/quem-e-quem/') !== (-1);
                this.routeSites = res.url.indexOf('/sites/') !== (-1);
            }
        });

        this.authService.authorizationLogin.subscribe(res => {
            this.auth = res;
            this.currentUser = this.authService.getUser();
        });
    }

    ngOnInit() {
        this.sharedsService.actionMenu(this.menuActivate);

        this.sharedsService.titlePage.subscribe(res => {
            this.titlePage = res;
        });

        setTimeout(() => {
            this.getNotifications();
            this.createNotificationInterval();
        }, 1500);
    }

    changeMenu() {
        this.menuActivate = !this.menuActivate;
        this.sharedsService.actionMenu(this.menuActivate);
    }

    goToDemand(notification) {
        if (notification) {
            this.router.navigate(['/gestao-de-demandas/demanda/', notification.demand_history.demand_id]);
            this.setUnread(notification.id);
        }
    }

    clearAllNotifications() {
        this.setUnread(null, true);
    }

    replaceText(text) {
        const result = text.replace(/<br\s*\/?>/gi, ' ');
        return result;
    }

    linkMenu(value) {
        this.router.navigate([value]);
    }

    setUnread(id, all = false) {
        if (id) {
            const data = {demand_notification_id: id};
            this.sharedsService.setUnreadDemandsNotifications(data).subscribe(res => {
                this.getNotifications();
            });
        } else if (!id && all) {
            const data = {unreadAll: true};

            this.sharedsService.setUnreadDemandsNotifications(data).subscribe(res => {
                this.getNotifications();
            });
        }
    }

    createNotificationInterval() {
        this.notificationInterval = setInterval(() => {
            if (!this.routeDemandManagement) {
                this.toFinishNotify();
            } else {
                this.getNotifications();
            }
        }, 20000);
    }

    getNotifications($event = null) {
        console.log($event);
        if ($event === null) {
            this.sharedsService.getDemandsNotifications(this.data).subscribe(res => {
                if (res) {
                    this.unread = 0;
                    res.data.forEach((item) => {
                        if (item.unread === 1) {
                            this.unread++;
                        }
                    });

                    this.notifications = res.data;
                    this.data.offset = res.offset;
                    this.data.total = res.total;
                    this.data.limit = res.limit;
                }
            });
        }
    }

    toFinishNotify() {
        if (this.notificationInterval) {
            clearInterval(this.notificationInterval);
        }
    }
}
