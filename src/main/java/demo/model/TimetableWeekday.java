package demo.model;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;


@Table(name = "timetable_weekday")
@NamedQueries({
        @NamedQuery(name = "TimetableWeekday.findById", query = "SELECT t FROM TimetableWeekday  t WHERE t.user_id = :user_id GROUP BY t.weekday "),
})
@Entity
public class TimetableWeekday implements Serializable {
    @Id
    private Integer user_id;
   @Id
    private Integer weekday;
    @Column(name = "start_time", nullable = false)
    private String startTime;
    @Column(name = "end_time", nullable = false)
    private String endTime;

    public TimetableWeekday(Integer user_id, Integer weekday, String startTime, String endTime) {
        this.user_id = user_id;
        this.weekday = weekday;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public TimetableWeekday() {
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getWeekday() {
        return weekday;
    }

    public void setWeekday(Integer weekday) {
        this.weekday = weekday;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TimetableWeekday)) return false;
        TimetableWeekday that = (TimetableWeekday) o;
        return getUser_id().equals(that.getUser_id()) && getWeekday().equals(that.getWeekday()) && getStartTime().equals(that.getStartTime()) && getEndTime().equals(that.getEndTime());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUser_id(), getWeekday(), getStartTime(), getEndTime());
    }

    @Override
    public String toString() {
        return "TimetableWeekday{" +
                "user_id=" + user_id +
                ", weekday=" + weekday +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                '}';
    }


}
