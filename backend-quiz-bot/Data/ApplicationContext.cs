using BackendQuizBot.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendQuizBot.Data;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options)
                        : base(options) { }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<Result> Results { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Question>().HasData(
            new List<Question>()
            {
                new Question(){ 
                    Id = 1,
                    Description = "Amir Temur qachon tug'ilgan?", 
                    Created = DateTime.Now
                }
            });

        modelBuilder.Entity<Answer>().HasData(
            new List<Answer>()
            {
                new Answer(){ 
                    Id = 1,
                    Description = "1336-yil",
                    Created = DateTime.Now,
                    QuestionId = 1,
                    IsTrue = true
                },
                new Answer(){
                    Id = 2,
                    Description = "1232-yil", 
                    Created = DateTime.Now,
                    QuestionId = 1
                },
                new Answer(){
                    Id = 3,
                    Description = "762-yil", 
                    Created = DateTime.Now,
                    QuestionId = 1
                },
                new Answer(){
                    Id = 4,
                    Description = "1993-yil",
                    Created = DateTime.Now,
                    QuestionId = 1
                }
            });
    }
}
