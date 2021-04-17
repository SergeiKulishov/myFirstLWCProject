import { LightningElement, track, wire } from 'lwc';
import searchLeads from '@salesforce/apex/LeadSearchController.searchLeads';

const COLS = [
    { label: 'Name', fieldName: 'Name', type:'text' },
    { label: 'Title', fieldName: 'Title', type: 'text' },
    { label: 'Company', fieldName: 'Company', type: 'text' },
    { label: 'View', type: 'button-icon', initialWidth: 75, typeAttributes:{title:'View Details',alternativeText:'View Details',iconName:'action:info'} }
];

export default class LeadList extends LightningElement {
    @track leads =[];
    @track searchterm;
    @track cols = COLS;

    handleSearchTermChange(event){
        this.searchterm = event.target.value;
        const selectedEvent = new CustomEvent('newsearch', {detail: this.searchterm})
        this.dispatchEvent(selectedEvent);
    }

    @wire(searchLeads, {
        searchterm: '$searchTerm'
    })
    loadLeads({ error, data }){
        if(data){
            this.leads = data;
            this.error = undefined;
        }else if(error){
            this.error = error;
            this.leads = undefined;
        }
    }

    
}