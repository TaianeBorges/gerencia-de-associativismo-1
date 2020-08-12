import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {Router, NavigationEnd} from '@angular/router';
import {SharedsService} from '../shareds.service';
import * as $AB from 'jquery';

declare var $: any;

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
    routeMailMarketing = false;
    titlePage;
    menuActivate = false;
    menuMobileActivate = false;
    menuPerfilActivate = false;
    currentUser;
    notificationInterval: any;
    data = {
        page: 1,
        limit: 30,
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
                this.routeMailMarketing = res.url.indexOf('/email-marketing') !== (-1);
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

        this.createNotificationInterval();
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
            if (this.routeDemandManagement && $('.notifications-dropdown .dropdown').attr('class').indexOf('show') === -1) {
                this.getNotifications();
            }
        }, 10000);
    }

    getNotifications($event = null) {

        if ($event === null) {
            this.data.page = 0;
        }

        this.sharedsService.getDemandsNotifications(this.data).subscribe(res => {
            if (res) {
                this.unread = 0;

                if ($event === null) {
                    res.data.forEach((item) => {
                        if (item.unread === 1) {
                            this.unread++;
                        }
                    });

                    this.notifications = res.data;
                } else {
                    this.notifications.push(res.data);
                }

                this.data.offset = res.offset;
                this.data.total = res.total;
                this.data.limit = res.limit;
            }
        });

    }

    toFinishNotify() {
        if (this.notificationInterval) {
            clearInterval(this.notificationInterval);
        }
    }
}
