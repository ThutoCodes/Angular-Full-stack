import { Component, Input, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { CatService } from '../services/cat.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Cat } from '../shared/models/cat.model';

@Component({
  selector: 'app-add-cat-form',
  templateUrl: './add-cat-form.component.html',
  styleUrls: ['./add-cat-form.component.scss'],
  standalone: false
})

export class AddCatFormComponent {
  private catService = inject(CatService);
  private formBuilder = inject(UntypedFormBuilder);
  toast = inject(ToastComponent);

  @Input() cats: Cat[] = [];

  addCatForm: UntypedFormGroup;
  name = new UntypedFormControl('', Validators.required);
  age = new UntypedFormControl('', Validators.required);
  weight = new UntypedFormControl('', Validators.required);

  constructor() {
    this.addCatForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  addCat(): void {
    this.catService.addCat(this.addCatForm.value).subscribe({
      next: res => {
        this.cats.push(res);
        this.addCatForm.reset();
        this.toast.setMessage('Item added successfully.', 'success');
      },
      error: error => console.log(error)
    });
  }

}
