module.exports =
  query: (el) ->
    document.querySelector el

  queryAll: (el) ->
    document.querySelectorAll el

  addClass: (el, className) ->
    @toggleClass 'add', el, className

  removeClass: (el, className) ->
    @toggleClass 'remove', el, className

  toggleClass: (action, el, className) ->
    if el != null
      i = 0
      while i < el.length
        el[i].classList[action] className
        i++
