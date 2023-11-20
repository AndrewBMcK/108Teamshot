#Dictionaries

user = {
    "name": "Andrew",
    "last_name": "McKinnon",
    "age": 34,
}
print(user)
print(type(user))

print(user["name"]+" "+user["last_name"])

#normally called an array, but in Python this is a list
number = [1,2,3]
print(number)
number.append(4)
print(number)
#length
print(len(number)) #count the number of items
print(len(user["name"])) #count characters
print(len(user)) #count the keys
#
ages = [32, 74, 20, 69, 52, 26, 31, 77, 43, 73, 51, 57, 19, 79, 40, 34, 27, 23, 21, 44, 53, 55, 24, 36, 41, 47, 78, 46, 68, 75, 49, 83, 61, 60, 29, 56, 67, 17, 70, 81, 87, 38]

def exc1():
    #print all the numbers (ages)
    #count how many ages are are less than 30
    total = 0
    count = 0
    for age in ages:
        total += age
        print(age)
        if age > 30 and age <50:
            count += 1

    print("there are "+str(count)+ " numbers between 30 and 50")

#call the functions
exc1()