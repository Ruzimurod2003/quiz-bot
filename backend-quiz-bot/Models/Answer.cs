using System.ComponentModel.DataAnnotations.Schema;

namespace BackendQuizBot.Models;
public class Answer
{
    public int Id { get; set; }
    public string Description { get; set; }
    public bool IsTrue { get; set; }
    public int QuestionId { get; set; }
    [ForeignKey("QuestionId")]
    public Question Question { get; set; }
    public DateTime Created { get; set; }
}