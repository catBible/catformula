import { TestBed } from '@angular/core/testing';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { UserService } from './user.service';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let functionsSpy: jasmine.SpyObj<AngularFireFunctions>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AngularFireFunctions', ['httpsCallable']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AngularFireFunctions, useValue: spy }
      ]
    });

    service = TestBed.inject(UserService);
    functionsSpy = TestBed.inject(AngularFireFunctions) as jasmine.SpyObj<AngularFireFunctions>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addUser function', async () => {
    const mockUserData = { user_id: '123', user_name: 'Test User' };
    const mockAddUser = jasmine.createSpy().and.returnValue(of({ message: 'User added successfully' }));
    functionsSpy.httpsCallable.and.returnValue(mockAddUser);

    await service.addUser(mockUserData);

    expect(functionsSpy.httpsCallable).toHaveBeenCalledWith('addUser');
    expect(mockAddUser).toHaveBeenCalledWith(mockUserData);
  });
});
