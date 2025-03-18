import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: true,
})
export class HeaderComponent {
  isUserInfoSelectionVisible = false;

  toggleUserInfoSelection(event: Event) {
    event.stopPropagation();
    this.isUserInfoSelectionVisible = !this.isUserInfoSelectionVisible;
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: Event) {
    this.isUserInfoSelectionVisible = false;
  }
}
