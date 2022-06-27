import axios from 'axios';
class Helper {
  static Isset(tvar) {
    return tvar !== null && tvar != 'undefined' && typeof tvar != 'undefined';
  }
  static Defined(tvar) {
    return tvar != 'undefined' && typeof tvar != 'undefined';
  }
  static Isobject(tvar) {
    return typeof tvar === 'object' && tvar != null;
  }
  static objectEmpty(tvar) {
    return Object.keys(tvar).length === 0 && tvar.constructor === Object;
  }
  static Isnumber(tvar) {
    return typeof tvar === 'number' && Number.isInteger(tvar);
  }
  static Isstring(tvar) {
    return typeof tvar === 'string' && tvar != '';
  }

  static isEmail(email) {
    if (email == '' || email.indexOf('@') == -1 || email.indexOf('.') == -1) {
      return false;
    } else {
      return true;
    }
  }
  static RetValid(tvar) {
    if (this.Defined(tvar)) {
      return tvar;
    }
  }
  static normalizeText(text) {
    if (text === null) {
      text = '';
    }
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    text = text.replace("'", '');
    text = text.replace('"', '');
    text = text.replace('`', '');
    text = text.replace('´', '');
    text = text.replace('~', '');
    text = text.replace('^', '');
    text = text.replace('.', '');
    text = text.replace(',', '');
    text = text.replace('*', '');

    return text;
  }
  static normalizeTextLow(text) {
    text = this.normalizeText(text);
    return text.toLowerCase();
  }
  static inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }
  static FieldWith(val) {
    return (
      val !== false &&
      val !== 'false' &&
      val != '' &&
      val != null &&
      val != 'null'
    );
  }
  static valDefault(act, save){
    if(act==="undefined" || typeof act=="undefined"){
      return save;
    }
    return act;
  }
  static formatName(name) {
    const fullName = name.split(' ');
    let firstName = fullName.slice(0, -1).join(' ');
    let lastName = fullName.slice(-1).join(' ');
    if (!firstName || firstName === '') {
      firstName = lastName;
      lastName = '';
    }
    return { first: firstName, last: lastName };
  }
  static async SendAxios(url, metodo = 'get') {
    try {
      if (metodo == 'post') {
        await axios.post(url);
      } else {
        await axios.get(url);
      }
    } catch (tryerror) {
      console.log(tryerror);
    }
  }
}

export default Helper;
