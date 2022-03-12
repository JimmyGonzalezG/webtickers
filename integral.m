clear;
clc;
syms x
f=input('ingrse la funcion: ');
F=inline(char(f));
a=input('desde: ');
b=input('hasta: ');
F=int(f,a,b)