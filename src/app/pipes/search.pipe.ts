import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(contacts: any[], searchText: string): any[] {

    if (!contacts || !searchText) {
      return contacts;
    }

    return contacts.filter(contact => {
      const fullName = `${contact.first_name} ${contact.last_name}`;
      return fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchText.toLowerCase());
    });
  }

}
