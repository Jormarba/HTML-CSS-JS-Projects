
# Flashcard App from AsmrProg

Flashcard app realizada siguiente el tutorial de YouTube, donde se realiza paso a paso utilizando HTML, CSS y JavaScript.
Además de seguir todo el tutorial y terminar con la página completamente funcional se ha arreglado un bug que contenía el código original en el cual si al abrir la pestaña para editar una flashcard la cerrabas sin modificar nada de esta la flashcard desaparecía.
Este bug se ha solucionado modificando las siguientes partes:

- Dentro del manejador de eventos del botón de edición, se llama a disableBtns(true) para deshabilitar todos los botones de edición mientras se está editando una tarjeta.
- Al cerrar el botón se asegura que se llama a disableBtns(false) para habilitar nuevamente los botones de edición.
- Cuando se guarda una tarjeta editada, se llama a disableBtns(false) para habilitar los botones de edición después de guardar.



## Authors

- [AsmrProg](https://www.youtube.com/watch?v=Lmj3zkVSJY4&t=1441s)
- Jorge Martínez Ballester

