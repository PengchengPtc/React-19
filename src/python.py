# # age = int(input("Enter your age: "))  # 将输入字符串转换为整数
# # if age < 18:
# #     print("You are a minor")
# # else:
# #     print("You are an adult")


# score:int = int(input("Enter your score: "))
# if score >= 90:
#     print("You are a genius")
# elif score >= 60:
#     print("You are a good student")
# else:
#     print("You are a bad student")


# 定义三个变量
name = "小明"
age = 18
score = 95

# 使用\n换行打印
print("姓名：" + name + "\n年龄：" + str(age) + "\n分数：" + str(score))

# 或者使用更现代的 f-string 方式（推荐）
print(f"姓名：{name}\n年龄：{age}\n分数：{score}")