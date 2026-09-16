print("PILAS iniciado")

productos = []

while True:
    nombre = input("Nombre del producto: ")
    fecha = input("Fecha de caducidad (AAAA-MM-DD): ")

    productos.append({
        "nombre": nombre,
        "fecha": fecha
    })

    print("\nProductos registrados:")
    print(productos)

    salir = input("\n¿Desea salir? (s/n): ")

    if salir.lower() == "s":
        break
      
