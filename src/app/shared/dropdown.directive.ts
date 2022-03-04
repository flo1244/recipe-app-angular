import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})


export class DropdownDirective {
    // isOpen = false; 
    //so we can bind to properties  of the element the directive is placed on
    //now we can use the directive in the html template.
    @HostBinding('class.open') isOpen = false;
    //listening for click and be able to toggle.
    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen;
    // }

    //this @HostListner allows user to click anywhere to close drop down. 
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    } 

    constructor(private elRef: ElementRef) {
        
    }
}