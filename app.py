import csv

print("=== PILAS ===")

producto = input("Producto: ")
fecha = input("Fecha de caducidad (AAAA-MM-DD): ")

with open("productos.csv", "a", newline="") as archivo:
    escritor = csv.writer(archivo)
    escritor.writerow([producto, fecha])

print("Producto guardado correctamente")
