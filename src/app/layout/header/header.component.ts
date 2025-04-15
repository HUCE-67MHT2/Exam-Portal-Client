import {Component, HostListener, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: true,
  imports: [CommonModule, NgIf],
  providers: [UserService],
})

export class HeaderComponent implements OnInit {

  isUserInfoSelectionVisible = false;
  UserInfoObject = {
    id: undefined,
    username: undefined,
    password: undefined,
    enabled: undefined,
    fullName: undefined,
    gender: undefined,
    birthday: undefined,
    address: undefined,
    email: undefined,
    telephone: undefined,
    avatarUrl: undefined,
    school: undefined,
    className: undefined,
    status: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser = () => {
    this.userService.getUserinfo().subscribe({
      next: (response) => {
        let jsonObject = JSON.parse(response);
        this.UserInfoObject = jsonObject;

      },
      error: (error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      },
    });
  }

  toggleUserInfoSelection(event: Event) {
    event.stopPropagation();
    this.isUserInfoSelectionVisible = !this.isUserInfoSelectionVisible;
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: Event) {
    this.isUserInfoSelectionVisible = false;
  }
  User = () => {
    this.router.navigate(["/student/user"]);
  }
  Logout = () => {
    localStorage.clear();
    this.router.navigate([""]);
  }
}
