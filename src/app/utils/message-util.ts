export const MessageUtil = {
  
  makeErrorMessage(errorKinds: string) {
    switch (errorKinds) {
      case "login":
        return "入力されたユーザー名とパスワードではログインできませんでした。"
      default:
        return null;
    }
  }
}


