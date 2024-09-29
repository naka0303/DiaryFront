export class Diary {
  diaryId!: number;
  diaryTitle!: string;
  diaryContent!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string;
}

export class DiaryLinkedUser {
  diaryId!: number;
  diaryTitle!: string;
  diaryContent!: string;
  userId!: number;
  username!: string;
  age!: number;
  email!: string;
  auth!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string;
}

export class RegisterDiary {
  userId!: number;
  diaryTitle!: string;
  diaryContent!: string;
}

export class EditDiary {
  userId!: number;
  diaryTitle!: string;
  diaryContent!: string;
}
