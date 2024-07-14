import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

// import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// @Directive({
//   selector: '[appScrollButtons]'
// })
// export class ScrollButtonsDirective {
//   @Input() scrollContainer: ElementRef | null = null;

//   constructor(private el: ElementRef) { }

//   @HostListener('click', ['$event'])
//   onClick(event: any) {
//     const buttonType = event.target.dataset.scroll;
//     const container = this.scrollContainer || this.el.nativeElement.parentElement;

//     if (!container || !buttonType) {
//       return;
//     }

//     // Rest of the code remains the same...
//   }
// }

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  categories: any[] = [];
  filteredCategories: any[] = [];
  searchQuery: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.userService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.onSearch();
    });
  }
  
  fetchCategories(): void {
    const page = 1;
    const itemsPerPage = 10;

    this.userService.getCategories(page, itemsPerPage).then(
      (response: any) => {
        if (response && Array.isArray(response)) {
          this.categories = response.filter((category: any) => category.category_id !== undefined && category.category_id !== null);
          this.filteredCategories = this.categories; // Initially show all categories
        } else {
          console.error('Failed to fetch categories:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
<<<<<<< HEAD

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(category =>
        category.category_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
=======
  

// scrollRight(popularGrid: ElementRef) {
//   popularGrid.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
// }



<<<<<<< HEAD
//   openSideBar() {
//     this.isSidebarShowing = true;
>>>>>>> 4fa9ad1dfdd865293120a124fcad907f30ab09bb
=======
>>>>>>> 0bccb8867e5bd2151781424126d2f448299adbfb

  navigateToProductPage(categoryId: number): void {
    if (categoryId === undefined || categoryId === null) {
      console.error('Invalid category ID:', categoryId);
      return;
    }
    this.router.navigate(['/product', categoryId]).catch(error => {
      console.error('Navigation error:', error);
    });
  }
<<<<<<< HEAD
=======
  
// }  

// function navigateToProductPage(categoryId: any, number: any) {
//   throw new Error('Function not implemented.');
// 
>>>>>>> 4fa9ad1dfdd865293120a124fcad907f30ab09bb
}
