import {Component, OnInit, Input, ViewEncapsulation, ViewChild, OnDestroy} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {Router, NavigationEnd} from '@angular/router';
import {SharedService} from '../shared.service';
import * as $AB from 'jquery';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../alerts/alert.service';


declare var $: any;

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

    modalRef: BsModalRef;
    formPassword: FormGroup;
    updatePasswordSubscribe: Subscription;

    @ViewChild('modal', {static: false}) modal;
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
    stopNotification = true;
    IsmodelShow;

    constructor(
        private modalService: BsModalService,
        private authService: AuthService,
        private router: Router,
        private sharedService: SharedService,
        private fb: FormBuilder,
        private  alertService: AlertService
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

    openModal(event) {
        event.stopPropagation();
        this.stopNotification = false;
        this.modalRef = this.modalService.show(this.modal, {class: 'modal-md modal-dialog-centered modal-change-password'});
    }

    closeModal() {
        this.modalRef.hide();
    }

    ngOnInit() {
        this.sharedService.actionMenu(this.menuActivate);

        this.formPassword = this.fb.group({
            currentPwd: ['', [Validators.required]],
            newPwd: ['', [Validators.required, Validators.minLength(6)]],
            confirmPwd: ['', [Validators.required]]
        });

        this.sharedService.titlePage.subscribe(res => {
            this.titlePage = res;
        });

        this.createNotificationInterval();
    }

    matchValues() {
        if (this.formPassword.get('newPwd').value) {
            if (this.formPassword.get('newPwd').value !== this.formPassword.get('confirmPwd').value) {
                this.formPassword.get('confirmPwd').setErrors({matchValues: true});
            } else {
                this.formPassword.get('confirmPwd').setErrors(null);
            }
        }
    }

    onSubmit() {
        this.formPassword.markAllAsTouched();
        this.matchValues();

        if (this.formPassword.valid) {
            let alert;

            this.updatePasswordSubscribe = this.sharedService.updatePasswordUser(this.formPassword.value).subscribe(res => {

                if (!res.update) {

                    alert = {
                        status: 200,
                        icon: 'priority_high',
                        color: 'warning',
                        title: 'Ops!',
                        message: res.message
                    };

                    this.alertService.alertShow(alert);
                } else {

                    alert = {
                        status: 200,
                        icon: 'check_circle',
                        color: 'success',
                        title: 'Parabéns!',
                        message: res.message
                    };

                    this.alertService.alertShow(alert);

                    this.closeModal();

                    localStorage.removeItem('Token');
                    localStorage.removeItem('user');
                    this.auth = false;
                    // this.authorizationLogin.emit(false);

                    this.router.navigate(['/login']);
                }
            });
        }
    }

    changeMenu() {
        this.menuActivate = !this.menuActivate;
        this.sharedService.actionMenu(this.menuActivate);
    }

    goToDemand(notification) {
        if (notification) {
            this.router.navigate(['/gestao-de-demandas/demanda/', notification.demand_history.demand_id], {queryParams: {status: true}});
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
            this.sharedService.setUnreadDemandsNotifications(data).subscribe(res => {
                this.getNotifications();
            });
        } else if (!id && all) {
            const data = {unreadAll: true};

            this.sharedService.setUnreadDemandsNotifications(data).subscribe(res => {
                this.getNotifications();
            });
        }
    }

    createNotificationInterval() {
        this.notificationInterval = setInterval(() => {

            if (this.routeDemandManagement && $('.notifications-dropdown .dropdown').attr('class').indexOf('show') === -1 && !$('.modal-change-password').length) {
                this.getNotifications();
            }
        }, 10000);
    }

    getNotifications($event = null) {

        if ($event === null) {
            this.data.page = 0;
        }

        this.sharedService.getDemandsNotifications(this.data).subscribe(res => {
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

    ngOnDestroy() {
        if (this.updatePasswordSubscribe) {
            this.updatePasswordSubscribe.unsubscribe();
        }
    }

    toFinishNotify() {
        if (this.notificationInterval) {
            clearInterval(this.notificationInterval);
        }
    }
}
