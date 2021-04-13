import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {UsersService} from '../users.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {AlertService} from '../../shared/alerts/alert.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {concatMapTo, map, mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  currentUser;
  filterModal: BsModalRef;
  userActive: boolean;
  optionsPermission = [
    {id: 0, name: 'Desativado'},
    {id: 1, name: 'Ativado'}
  ];
  data = {
    filters: {},
    page: null,
    limit: null,
    offset: null,
    total: null
  };
  formFilter;
  users$: Observable<any>;
  roles;
  formUser: any;
  status;
  modalUser;
  userModal: any;

  constructor(
    private fb: FormBuilder,
    private usersServices: UsersService,
    private alertService: AlertService,
    private modalService: BsModalService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formFilter = this.fb.group({
      user_name: new FormControl('')
    });


    this.formUser = this.fb.group({
      user: this.fb.group({
        id: new FormControl('')
      }),
      role: new FormControl('', [Validators.required])
    });

    this.currentUser = JSON.parse(localStorage.getItem('user'));

    if (this.currentUser.user.role !== 10) {
      this.router.navigate(['/']);
    } else {
      this.getUsers();
      this.getRoles();
    }
  }

  getUsers() {
    this.users$ = this.usersServices.getUsers(this.data)
      .pipe(
        map(res => res.data)
      );
  }

  getRoles() {
    this.usersServices.getRoles().subscribe(res => {
      this.roles = res.data;
    });
  }

  updateUser(userId) {
    this.formUser.get('user').get('id').setValue(userId);
    let alert;

    this.usersServices.updateUser(this.formUser.value).subscribe(res => {
      if (res.update) {

        alert = {
          status: 200,
          icon: 'check_circle',
          color: 'success',
          title: 'Parabéns!',
          message: 'Usuário alterado com sucesso!'
        };

      } else {

        alert = {
          status: 200,
          icon: 'priority_high',
          color: 'warning',
          title: 'Atenção!',
          message: 'Não foi possível alterar o usuário.',
          actions: {
            close: true
          }
        };
      }

      this.alertService.alertShow(alert);
    });
  }

  onSubmit() {
    this.filterModal.hide();

    if (this.formFilter.value) {
      this.data.filters = this.formFilter.value;
      this.getUsers();
    }
  }

  resetForm() {
    this.filterModal.hide();
    this.formFilter.reset();
    this.data.filters = {};
    this.getUsers();
  }

  openFilter(template: TemplateRef<any>) {
    this.filterModal = this.modalService.show(template);
  }

  closeModal() {
    this.filterModal.hide();
  }

  openUserModal(template, data) {
    this.userModal = data;
    this.modalUser = this.modalService.show(template, {class: 'modal-lg modal-dialog-centered modal-user'});
  }

  closeUserModal() {
    this.modalUser.hide();
  }

  ngOnDestroy() {
  }
}
